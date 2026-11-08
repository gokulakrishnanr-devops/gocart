package handlers

import (
	"log"
	"strings"

	"github.com/gocart/backend/internal/database"
	"github.com/gocart/backend/internal/middleware"
	"github.com/gocart/backend/internal/models"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func Register(c *fiber.Ctx) error {
	req := models.RegisterRequest{
		Name:     c.FormValue("name"),
		Email:    c.FormValue("email"),
		Password: c.FormValue("password"),
		Phone:    c.FormValue("phone"),
		Address:  c.FormValue("address"),
	}

	if req.Name == "" || req.Email == "" || req.Password == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Name, email, and password are required",
		})
	}

	if req.Phone == "" || req.Address == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Phone number and address are required",
		})
	}

	var existing models.User
	if result := database.DB.Where("email = ?", req.Email).First(&existing); result.Error == nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"error": "Email already registered",
		})
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		log.Printf("Error hashing password: %v", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to process registration",
		})
	}

	user := models.User{
		Name:         req.Name,
		Email:        req.Email,
		PasswordHash: string(hashedPassword),
		Phone:        req.Phone,
		Address:      req.Address,
	}

	if result := database.DB.Create(&user); result.Error != nil {
		log.Printf("Error creating user: %v", result.Error)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to create user",
		})
	}

	token, err := middleware.GenerateToken(user.ID, user.Email)
	if err != nil {
		log.Printf("Error generating token: %v", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to generate token",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(models.AuthResponse{
		Token: token,
		User:  user,
	})
}

func Login(c *fiber.Ctx) error {
	var req models.LoginRequest

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	if req.Email == "" || req.Password == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Email and password are required",
		})
	}

	var user models.User

	if result := database.DB.Where("email = ?", req.Email).First(&user); result.Error != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Invalid email or password",
		})
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Invalid email or password",
		})
	}

	token, err := middleware.GenerateToken(user.ID, user.Email)
	if err != nil {
		log.Printf("Error generating token: %v", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to generate token",
		})
	}

	return c.JSON(models.AuthResponse{
		Token: token,
		User:  user,
	})
}

func GetProfile(c *fiber.Ctx) error {
	userID, err := getAuthenticatedUserID(c)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Invalid authentication",
		})
	}

	var user models.User

	if err := database.DB.First(&user, userID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"error": "Customer not found",
			})
		}

		log.Printf("Error retrieving customer profile: %v", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve profile",
		})
	}

	return c.JSON(user)
}

func UpdateProfile(c *fiber.Ctx) error {
	userID, err := getAuthenticatedUserID(c)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Invalid authentication",
		})
	}

	var user models.User

	if err := database.DB.First(&user, userID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
				"error": "Customer not found",
			})
		}

		log.Printf("Error retrieving customer profile: %v", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve profile",
		})
	}

	name := strings.TrimSpace(c.FormValue("name"))
	phone := strings.TrimSpace(c.FormValue("phone"))
	address := strings.TrimSpace(c.FormValue("address"))

	if name == "" || phone == "" || address == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Name, phone number, and address are required",
		})
	}

	updates := map[string]interface{}{
		"name":    name,
		"phone":   phone,
		"address": address,
	}

	if err := database.DB.Model(&user).Updates(updates).Error; err != nil {
		log.Printf("Error updating customer profile: %v", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to update profile",
		})
	}

	if err := database.DB.First(&user, userID).Error; err != nil {
		log.Printf("Error retrieving updated profile: %v", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Profile updated, but failed to retrieve updated details",
		})
	}

	return c.JSON(user)
}

func getAuthenticatedUserID(c *fiber.Ctx) (uint, error) {
	value := c.Locals("userID")

	switch id := value.(type) {
	case uint:
		return id, nil
	case uint64:
		return uint(id), nil
	case int:
		if id > 0 {
			return uint(id), nil
		}
	case float64:
		if id > 0 {
			return uint(id), nil
		}
	}

	return 0, fiber.NewError(fiber.StatusUnauthorized, "Invalid user ID")
}
