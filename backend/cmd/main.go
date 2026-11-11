package main

import (
	"log"
	"os"

	"github.com/gocart/backend/internal/database"
	"github.com/gocart/backend/internal/handlers"
	"github.com/gocart/backend/internal/middleware"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func main() {
	database.Connect()

	app := fiber.New(fiber.Config{
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			code := fiber.StatusInternalServerError
			if e, ok := err.(*fiber.Error); ok {
				code = e.Code
			}
			return c.Status(code).JSON(fiber.Map{"error": err.Error()})
		},
	})

	app.Use(logger.New())
	app.Use(recover.New())

	frontendOrigin := os.Getenv("FRONTEND_ORIGIN")
	if frontendOrigin == "" {
		frontendOrigin = "http://localhost:3000"
	}

	allowCredentials := frontendOrigin != "*"

	app.Use(cors.New(cors.Config{
		AllowOrigins:     frontendOrigin,
		AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders:     "Origin,Content-Type,Accept,Authorization",
		AllowCredentials: allowCredentials,
	}))

	app.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"status": "healthy"})
	})

	api := app.Group("/api")

	// Authentication routes.
	auth := api.Group("/auth")
	auth.Post("/register", handlers.Register)
	auth.Post("/login", handlers.Login)

	// Customer account routes.
	profile := api.Group("/profile", middleware.Protected())
	profile.Get("/", handlers.GetProfile)
	profile.Put("/", handlers.UpdateProfile)

	// Product routes.
	products := api.Group("/products")
	products.Get("/", handlers.GetProducts)
	products.Get("/:id", handlers.GetProduct)
	products.Post("/", middleware.Protected(), handlers.CreateProduct)

	// Cart routes.
	cart := api.Group("/cart", middleware.Protected())
	cart.Get("/", handlers.GetCart)
	cart.Post("/", handlers.AddToCart)
	cart.Put("/:id", handlers.UpdateCartItem)
	cart.Delete("/:id", handlers.RemoveCartItem)

	// Order routes.
	orders := api.Group("/orders", middleware.Protected())
	orders.Get("/", handlers.GetOrders)
	orders.Post("/", handlers.CreateOrder)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
	}

	log.Printf("Server starting on port %s", port)
	log.Fatal(app.Listen(":" + port))
}
