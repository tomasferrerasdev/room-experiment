import { Sidebar } from '../../Sidebar/Sidebar';
import styles from './About.module.scss';

export const About = () => {
  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <div className={styles.about}>
        <div className={styles.aboutContent}>
          <h1>Welcome</h1>
          <h2>I'm Tomas Ferreras</h2>
          <div className={styles.content}>
            <p>
              I'm a software engineer currently working at Vercel! In May of
              2022 I graduated from Rensselaer Polytechnic Institute with my BS
              in Computer Science.
            </p>
            <p>
              Thank you for taking the time to check out my portfolio. I really
              hope you enjoy exploring it as much as I enjoyed building it. If
              you have any questions or comments, feel free to contact me using{' '}
              <a href="">this form</a> or shoot me an email at{' '}
              <a href="">hellotomasdev@gmail.com</a>
            </p>

            <div className={styles.resume}>
              <img src="/assets/windows/resume.gif" alt="" />
              <div className={styles.resumeText}>
                <p>Looking for my resume?</p>
                <a href="">Click here to download it!</a>
              </div>
            </div>

            <div className={styles.aboutMe}>
              <h2>About Me</h2>
              <p>
                From a young age, I have had a curiosity about how things
                worked. This naturally led me to become absolutely obsessed with
                Lego and I fell in love with building things. In elementary
                school, I joined the Lego Robotics team at my local middle
                school, which was my first real exposure to programming. In
                2008, my family and I moved across the country from California
                to New York, where I attended middle school, high school, and
                college.
              </p>
              <img src="/assets/windows/me.jpg" alt="tomas ferreras" />
              <p>
                In 2017, I got accepted into Rennselear Polytechnic Institute to
                study Computer Science. It was my first choice and I was
                absolutely ecstatic to be going to such a great university. At
                the end of my sophomore year, I got an internship working for
                the startup Hover, primarily focusing on frontend work. I
                continued to work at Hover on and off for about a year and a
                half, until the start of my senior year when I decided to focus
                on other opportunities.
              </p>
              <img src="/assets/windows/me_outdoor.jpg" alt="tomas ferreras" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
