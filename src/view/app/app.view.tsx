import { useEffect, useState } from "react";
import { List } from "../list/list.view";
import { Robot } from "../../types";
import styles from './app.module.scss';
import { Filter } from "../filter/filter.view";

export function App() {
  const [robotsList, setRobotsList] = useState<Robot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [filteredRobotsList, setFilteredRobotsList] = useState<Robot[]>([]);

  useEffect(() => {

    async function getData(): Promise<void> {
      try {
        const data_url = "https://api.npoint.io/86690d80ff3d455133f0";
        const response = await fetch(data_url);
        const data = await response.json() as Robot[];
        // console.table(data);
        // console.log(`${data.length} items loaded`);
        setRobotsList(data);
      } catch (error: unknown) {
        setErrorMsg(`fetch operation failed: ${(error as Error).message}`);
      } finally {
        setIsLoading(false);
      }
    }
    getData().catch(console.log);
  }, []);

  const handleFilterChange = (filterText: string) => {
    const filteredList = robotsList.filter((robot) =>
      robot.first_name.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredRobotsList(filteredList);
    setRobotsList(filteredList);
    if(filterText.length == 0){
      setRobotsList(robotsList);
    }
  };

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <Filter
          onFilterChange={handleFilterChange}
          filteredCount={filteredRobotsList.length === 0 ? robotsList.length : filteredRobotsList.length}/>
        <h1 className={`${styles.headline} ${styles["white-text"]}`}>Show me the list!</h1>
      </div>
      {errorMsg ? (
        <h1 className={styles["error-msg"]}>{errorMsg}</h1>
      ) : isLoading ? (
        <h1 className={styles.loading}>Loading...</h1>
      ) : (
        <List listData={robotsList} />
      )}
    </div>
  );
}
