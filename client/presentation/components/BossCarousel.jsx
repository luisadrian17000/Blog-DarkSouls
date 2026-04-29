import { useMemo, useState } from "react";
import styles from "./BossCarousel.module.css";
import BossPopUp from "./BossPopUp.jsx";

const bossImages = import.meta.glob("../../assets/bosses/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
});

function getBossImage(filename) {
  const key = `../../assets/bosses/${filename}`;
  return bossImages[key];
}

const BossCarousel = ({ bosses }) => {
  const safeBosses = useMemo(() => (Array.isArray(bosses) ? bosses : []), [bosses]);
  const total = safeBosses.length;

  const [index, setIndex] = useState(0);
  const [selectedBoss, setSelectedBoss] = useState(null);

  const safeIndex = total === 0 ? 0 : index % total;
  const current = total > 0 ? safeBosses[safeIndex] : null;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);
  const goTo = (i) => setIndex(i);

  if (total === 0) {
    return <div className={styles.empty}>No bosses found.</div>;
  }

  const imgSrc = getBossImage(current.image);

  return (
      <>
        <div className={styles.carousel}>
          <div className={styles.frame}>
            <button className={styles.navBtn} onClick={prev} aria-label="Previous boss">
              ‹
            </button>

            <div
                className={styles.slide}
                onClick={() => setSelectedBoss(current)}
            >
              {imgSrc ? (
                  <img
                      className={styles.image}
                      src={imgSrc}
                      alt={current.name}
                  />
              ) : (
                  <div className={styles.missingImage}>
                    Missing image: <code>{current.image}</code>
                  </div>
              )}

              <div className={styles.meta}>
                <h2 className={styles.title}>{current.name}</h2>
                <p className={styles.area}>{current.area}</p>
              </div>
            </div>

            <button className={styles.navBtn} onClick={next} aria-label="Next boss">
              ›
            </button>
          </div>

          <div className={styles.dots}>
            {safeBosses.map((b, i) => (
                <button
                    key={b.id ?? `${b.name}-${i}`}
                    className={`${styles.dot} ${
                        i === safeIndex ? styles.dotActive : ""
                    }`}
                    onClick={() => goTo(i)}
                    aria-label={`Go to ${b.name}`}
                />
            ))}
          </div>
        </div>


        <BossPopUp
            boss={selectedBoss}
            onClose={() => setSelectedBoss(null)}
        />
      </>
  );
};

export default BossCarousel;