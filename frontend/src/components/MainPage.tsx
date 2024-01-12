import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface MainPageProps {}

export const MainPage: FunctionComponent<MainPageProps> = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  // baboo@gmail.com , z(V7+V!)TZH#6r9B
  //papakoaki@gmail.com , bEQYe4Qb*%CcE*zjy!Dj%Q^*(2&cIZ)J6&3*5*UuBz
  //hagetta@gmail.com , z(V7+V!)TZH#6r9B

  function handleLogout(event: any): void {
    logout();
    navigate("/login");
  }

  return (
    <div>
      <h2>MainPage</h2>
      <br />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, quis
        nobis autem dicta, vitae id odio sapiente iure incidunt laudantium earum
        hic voluptates at suscipit amet harum, dolorem adipisci explicabo quas
        rerum nesciunt architecto corrupti. Officiis repellendus totam esse
        nostrum necessitatibus, adipisci culpa eius modi ipsum quidem
        dignissimos doloremque! Nobis quos quaerat magni blanditiis saepe. Eius
        modi ea rem consectetur voluptatem, quae perferendis iusto asperiores
        maxime, porro nisi maiores fugit ipsam libero, eos nesciunt at! Quod,
        quibusdam, sint praesentium architecto quaerat ad aliquam laboriosam
        quidem unde maiores optio cupiditate. Incidunt sunt, eum in impedit
      </p>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};
