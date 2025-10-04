import { useParams, Link } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useThemeStore } from '../theme/useTheme';

// Lazy load project-specific 3D components
const ProjectScene = lazy(() => import('../components/ProjectScene'));

const projectData = {
  'sample-1': {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with React, Node.js, and PostgreSQL.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    features: ['User authentication', 'Payment processing', 'Inventory management', 'Analytics dashboard'],
    github: 'https://github.com/username/ecommerce-platform',
    live: 'https://ecommerce-demo.com',
    devops: {
      deployment: 'AWS ECS with Fargate',
      ci: 'GitHub Actions',
      monitoring: 'CloudWatch + Datadog',
      infrastructure: 'Terraform'
    }
  },
  'sample-2': {
    title: '3D Visualization Dashboard',
    description: 'Interactive 3D data visualization using Three.js and WebGL.',
    tech: ['Three.js', 'React', 'D3.js', 'WebGL', 'Docker'],
    features: ['Real-time 3D rendering', 'Data streaming', 'Custom shaders', 'Performance optimization'],
    github: 'https://github.com/username/3d-dashboard',
    live: 'https://3d-dashboard-demo.com',
    devops: {
      deployment: 'Vercel + AWS Lambda',
      ci: 'GitHub Actions',
      monitoring: 'Sentry + LogRocket',
      infrastructure: 'Serverless'
    }
  },
  'sample-3': {
    title: 'Microservices Architecture',
    description: 'Scalable microservices platform with event-driven architecture.',
    tech: ['Node.js', 'Docker', 'Kubernetes', 'Redis', 'MongoDB'],
    features: ['Service mesh', 'Event sourcing', 'API gateway', 'Auto-scaling'],
    github: 'https://github.com/username/microservices-platform',
    live: 'https://microservices-demo.com',
    devops: {
      deployment: 'Kubernetes on GCP',
      ci: 'GitLab CI/CD',
      monitoring: 'Prometheus + Grafana',
      infrastructure: 'Helm charts'
    }
  }
};

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const resolved = useThemeStore((s) => s.resolved);
  
  const project = slug ? projectData[slug as keyof typeof projectData] : null;

  if (!project) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="text-white/80 mb-6">The project you're looking for doesn't exist.</p>
        <Link to="/" className="text-brand hover:underline">← Back to Portfolio</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* 3D Background */}
      <div className="fixed inset-0 -z-10 opacity-20">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <color attach="background" args={[resolved === 'light' ? '#f8fafc' : '#0f172a']} />
          <Environment preset={resolved === 'light' ? 'sunset' : 'city'} background={false} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 5, 2]} intensity={1.0} />
          <Suspense fallback={null}>
            <ProjectScene projectType={slug} light={resolved === 'light'} />
          </Suspense>
          <OrbitControls enablePan={false} enableZoom={false} />
        </Canvas>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* Header */}
        <div className="glass-panel p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
              <p className="text-white/80 text-lg mb-6">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-full bg-brand/20 text-brand text-sm">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a href={project.github} target="_blank" rel="noopener noreferrer" 
                   className="px-4 py-2 rounded-md bg-brand text-white hover:bg-brand/90 transition-colors">
                  View Code
                </a>
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                   className="px-4 py-2 rounded-md border border-white/20 text-white hover:bg-white/5 transition-colors">
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="glass-panel p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {project.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand"></div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* DevOps Section */}
        <div className="glass-panel p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">DevOps & Infrastructure</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Deployment</h3>
              <p className="text-white/80">{project.devops.deployment}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">CI/CD</h3>
              <p className="text-white/80">{project.devops.ci}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Monitoring</h3>
              <p className="text-white/80">{project.devops.monitoring}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Infrastructure</h3>
              <p className="text-white/80">{project.devops.infrastructure}</p>
            </div>
          </div>
        </div>

        {/* Architecture Diagram Placeholder */}
        <div className="glass-panel p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Architecture</h2>
          <div className="aspect-video bg-gradient-to-br from-brand/20 to-purple-600/20 rounded-lg flex items-center justify-center">
            <p className="text-white/60">Architecture diagram would go here</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link to="/" className="text-brand hover:underline">← Back to Portfolio</Link>
          <div className="text-sm text-white/60">
            Project: {slug}
          </div>
        </div>
      </div>
    </div>
  );
}