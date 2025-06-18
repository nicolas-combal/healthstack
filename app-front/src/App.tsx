import React, { useEffect, useState } from "react";

type ServiceStatus = "online" | "offline" | "checking";

interface Service {
  name: string;
  url: string;
}

const services: Service[] = [
    { name: "Gateway", url: "/health" },
    { name: "Service Auth", url: "/auth" },
    { name: "Service Reports", url: "/reports" },
];

const App: React.FC = () => {
  const [status, setStatus] = useState<Record<string, ServiceStatus>>({});

  const checkServiceStatus = async () => {
    const newStatus: Record<string, ServiceStatus> = {};

    await Promise.all(
        services.map(async (service) => {
          newStatus[service.name] = "checking";
          try {
            const response = await fetch(service.url, { method: "GET" });
            newStatus[service.name] =
                response.ok ? "online" : "offline";
          } catch (error) {
            newStatus[service.name] = "offline";
          }
        })
    );

    setStatus(newStatus);
  };

  useEffect(() => {
    checkServiceStatus();
    const interval = setInterval(checkServiceStatus, 5000); // vérifie toutes les 5s
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (s: ServiceStatus) => {
    switch (s) {
      case "online":
        return "green";
      case "offline":
        return "red";
      default:
        return "gray";
    }
  };

  return (
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>État des microservices</h1>
        <ul>
          {services.map((service) => (
              <li key={service.name} style={{ margin: "1rem 0" }}>
                  <a href={`http://localhost:8000${service.url}`}
                     target="_blank"
                     rel="noopener noreferrer"> {service.name}
                  </a>:{" "}
                  <span
                    style={{
                      color: getStatusColor(status[service.name]),
                      fontWeight: "bold",
                    }}
                >
              {status[service.name] ?? "checking..."}
            </span>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default App;