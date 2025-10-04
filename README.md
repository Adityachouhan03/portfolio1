# Portfolio Website

A modern, immersive portfolio website showcasing full-stack development, DevOps practices, and 3D/WebGL experiences. Built with React, Three.js (R3F), and deployed via Docker + CI/CD.

## Features

- 🎨 **3D Interactive Scene**: Three.js with React Three Fiber
- 🌙 **Day/Night Theme**: Synchronized UI and 3D lighting
- 📱 **Responsive Design**: Mobile-first with graceful fallbacks
- ⚡ **Performance Optimized**: Lazy loading, code splitting, low-end device fallbacks
- 🐳 **Dockerized**: Production-ready containers
- 🚀 **CI/CD Pipeline**: GitHub Actions with automated testing and deployment
- ♿ **Accessible**: WCAG compliant with keyboard navigation

## Tech Stack

### Frontend

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- React Three Fiber (R3F) + Drei
- Framer Motion (animations)
- React Router

### Backend

- Node.js + Express
- CORS + Helmet (security)
- Morgan (logging)

### DevOps

- Docker + Docker Compose
- GitHub Actions CI/CD
- Nginx (production frontend)

## Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Git

### Local Development

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd project3
   ```

2. **Install dependencies**

   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   npm install
   ```

3. **Start development servers**

   ```bash
   # Terminal 1 - Frontend (http://localhost:5173)
   cd frontend
   npm run dev

   # Terminal 2 - Backend (http://localhost:3001)
   cd backend
   npm run start
   ```

### Docker Development

```bash
# Development with hot reload
docker-compose -f docker-compose.dev.yml up --build

# Production build
docker-compose up --build
```

## Project Structure

```
project3/
├── frontend/                 # React app
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── routes/          # Page components
│   │   ├── scene/           # 3D scene components
│   │   ├── theme/           # Theme management
│   │   └── utils/           # Utilities
│   ├── public/              # Static assets
│   ├── Dockerfile           # Production container
│   └── Dockerfile.dev       # Development container
├── backend/                 # Express API
│   ├── src/
│   │   └── server.js        # Main server file
│   ├── Dockerfile
│   └── Dockerfile.dev
├── .github/workflows/       # CI/CD pipeline
├── docker-compose.yml       # Production setup
├── docker-compose.dev.yml   # Development setup
└── README.md
```

## 3D Scene Features

- **Theme-Aware Lighting**: Day/night mode affects 3D scene lighting
- **Low-End Fallback**: Automatic detection and graceful degradation
- **Procedural Assets**: Canvas-generated textures and low-poly geometry
- **Interactive Controls**: Mouse/touch orbit controls
- **Performance Monitoring**: FPS tracking and optimization

## Performance Tips

1. **3D Optimization**

   - Use `useGLTF.preload()` for models
   - Implement LOD (Level of Detail) for complex models
   - Compress textures with Draco compression
   - Monitor draw calls and polygon count

2. **Bundle Optimization**

   - Code splitting with React.lazy()
   - Tree shaking unused dependencies
   - Image optimization and lazy loading
   - Service worker for caching

3. **Device Detection**
   - WebGL capability detection
   - Memory and CPU core detection
   - Responsive 3D quality settings

## Deployment

### Environment Variables

Create `.env` files in both frontend and backend:

**frontend/.env**

```env
VITE_API_URL=https://your-api-domain.com
```

**backend/.env**

```env
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://your-frontend-domain.com
```

### Production Deployment

1. **Docker Hub Setup**

   ```bash
   # Login to Docker Hub
   docker login

   # Build and push images
   docker-compose build
   docker-compose push
   ```

2. **GitHub Actions Secrets**

   - `DOCKER_USERNAME`: Your Docker Hub username
   - `DOCKER_PASSWORD`: Your Docker Hub password

3. **Deploy to Cloud Provider**
   - Update deployment targets in `.github/workflows/ci.yml`
   - Configure load balancer and SSL
   - Set up monitoring and logging

### Kubernetes Deployment (Optional)

```yaml
# k8s/frontend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: portfolio-frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: portfolio-frontend
  template:
    metadata:
      labels:
        app: portfolio-frontend
    spec:
      containers:
        - name: frontend
          image: your-username/portfolio-frontend:latest
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: portfolio-frontend-service
spec:
  selector:
    app: portfolio-frontend
  ports:
    - port: 80
      targetPort: 80
  type: LoadBalancer
```

## Development Guidelines

### Code Style

- Use TypeScript strict mode
- Follow React hooks best practices
- Implement proper error boundaries
- Write meaningful commit messages

### Performance

- Monitor bundle size with `npm run build -- --analyze`
- Use React DevTools Profiler
- Test on various devices and networks
- Implement proper loading states

### Accessibility

- Use semantic HTML elements
- Provide alt text for images
- Ensure keyboard navigation
- Test with screen readers

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions or support, please open an issue on GitHub or contact [your-email@domain.com].

---

Built with ❤️ using React, Three.js, and modern DevOps practices.
