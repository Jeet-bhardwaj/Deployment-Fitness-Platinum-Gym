
import styles from './GoogleReview.module.css'; // Import CSS for styling

const GoogleReview = () => {
  const handleClick = () => {
    window.open('https://maps.app.goo.gl/J8fKXw8Qqy543ccv8', '_blank'); // Replace with your Google review link
  };

  return (
    <div className={styles.googleReview} onClick={handleClick}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Google_Maps_Logo_2020.svg/512px-Google_Maps_Logo_2020.svg.png" alt="Google Review" /> {/* Google logo */}
      <span>4.8</span>
    </div>
  );
};

export default GoogleReview; 