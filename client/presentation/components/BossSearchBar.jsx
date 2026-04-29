import styles from "./BossSearchBar.module.css";

const BossSearchBar = ({ value, onChange, placeholder = "Search boss..." }) => {
  return (
    <div className={styles.wrap}>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        spellCheck={false}
      />
    </div>
  );
};

export default BossSearchBar;