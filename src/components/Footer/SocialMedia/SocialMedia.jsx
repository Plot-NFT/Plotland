/* eslint-disable react/react-in-jsx-scope */
import styles from "./SocialMedia.module.scss";

const SocialMedia = () => {
  return (
    <div className={styles.wrapper}>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://discord.com/invite/xeRNRB9ksA"
      >
        <img
          className={styles.discord}
          src="/assets/discord.png"
          alt="discord Logo"
        />
      </a>

      <a
        target="_blank"
        rel="noreferrer"
        href="https://www.reddit.com/user/plotNFT"
      >
        <img
          className={styles.reddit}
          src="/assets/reddit.png"
          alt="Reddit Logo"
        />
      </a>

      <a target="_blank" rel="noreferrer" href="https://twitter.com/plot_NFT">
        <img
          className={styles.twitter}
          src="/assets/twitter.png"
          alt="twitter Logo"
        />
      </a>
    </div>
  );
};

export default SocialMedia;
