import styles from "@/components/ui/dashboard/dashboard.module.css";
import { Dboard } from "@/components/component/dboard";
const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
        <Dboard />
    </div>
  );
};

export default Dashboard;