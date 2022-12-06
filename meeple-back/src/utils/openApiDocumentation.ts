const openApiDocumentation = {
  openapi: '3.0.0',
  info: {
    version: '1.1.0',
    title: 'Users and auth API',
    description: 'User and outh management API',
    termsOfService: '/',
    contact: {
      name: 'test',
      email: 'hello@test.co',
      url: 'http://www.test.com'
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: 'Local server'
    },
  ],
  components: {
    schemas: {
      User: {
        type: "object",
        required: ["email", "password"],
        properties: {
          id: {
            type: "string",
            description: "Auto Generated ID"
          },
          email: {
            type: "string",
            description: "email used for authentication"
          },
          password: {
            type: "string",
            description: "password used for authentication"
          }
        },
        example: {
          id: "6238849db3asdaf9154e5f2c",
          email: "johndow@mail.com",
          password: "MyPass1234-test"
        }
      }
    }
  },
  tags: [
    {
      name: "Auth",
      description:"Auth routes"
    },
    {
      name: "User",
      description: "User routes"
    }
  ],
  paths: {
    '/api/auth/sign-up': {
      post: {
        summary: "Sign up",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User"
              }
            }
          }
        },
        responses: {
          "201": {
            description: "User was successfully registered",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User"
                }
              }
            }
          },
          "500": {
            description: "Some server error"
          }
        }
      }
    },
    '/api/auth/sign-in': {
      post: {
        summary: "Sign In",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User"
              }
            }
          }
        },
        responses: {
          "200": {
            description: "User was successfully loggged in",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User"
                }
              }
            }
          },
          "500": {
            description: "Some server error"
          }
        }
      }
    },
    "/api/auth/sign-out": {
      post: {
        summary: "Sign Out",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User"
              }
            }
          }
        },
        responses: {
          "200": {
            description: "User was successfully loggged out",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User"
                }
              }
            }
          },
          "500": {
            description: "Some server error"
          }
        }
      }
    },
    "/api/users/current-user": {
      get: {
        summary: "Returns current user",
        tags: ["User"],
        responses: {
          "200": {
            description: "Returns current user",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  items: {
                    $ref: "#/components/schemas/User"
                  }
                }
              }
            }
          },
          "500": {
            description: "Some server error"
          }
        }
      }
    }
  }
};

export default openApiDocumentation;