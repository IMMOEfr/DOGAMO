import styles from "./sidebar.module.css";
import { Button } from "../../button";
import { signOut } from "@/auth";

const Sidebar = async () => {
  return (
    <div className={styles.container}>
      <div>
          <span className={styles.userTitle}>Welcome, Admin</span>
      </div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button className="w-full m-1 mt-10 text-sm">Logout</Button>
      </form>
    </div>
  );
};

export default Sidebar;