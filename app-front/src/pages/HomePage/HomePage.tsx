import React from 'react';
import styles from './HomePage.module.css';

interface Service {
    name: string;
    url: string;
}

const services: Service[] = [
    { name: "Service Auth", url: "/auth" },
    { name: "Service Reports", url: "/reports" },
    { name: "PgAdmin", url: "/pgadmin" },
];

const HomePage: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Liens vers les microservices</h1>
            <ul className={styles.serviceList}>
                {services.map((service) => (
                    <li key={service.name} className={styles.serviceItem}>
                        <a
                            href={`http://localhost:8000${service.url}`}
                            className={styles.serviceLink}
                            rel="noopener noreferrer"
                        >
                            {service.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;