import React from "react";
import axios from "axios";
import { Link, useNavigate, NavLink } from "react-router-dom";
export default function AboutUs() {
  const navigate = useNavigate();
  const verifyUser = async () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt || jwt.length === 0) {
      navigate("/login");
    }
    const response = await axios.get(
      "http://localhost:8888/api/auth/verifyuser",
      { headers: { Authorization: `Bearer ${jwt}` } }
    );

    const { success } = response.data;
    console.log(success);
    if (!success) {
      navigate("/login");
      return;
    }
  };
  verifyUser();
  return (
    <>
      <div id="hero"></div>
      <section id="about">
        <div>
          <h1>All You Need To Know About What We Do!</h1>
          <p>
            Lorem ipsum dolor sit amet consecteturt libero? Laudantium,
            excepturi natus? Molestiae maxime optio iusto explicabo unde,
            deserunt eos qui aliquam accusamus delectus veritatis dicta maiores
            quos placeat incidunt reiciendis aut dolore architecto ullam ut
            veniam odit. Magni minima quae blanditiis provident cupiditate
            aliquid totam velit voluptates temporibus eligendi incidunt suscipit
            earum inventore iure magnam exercitationem nisi et quibusdam
            mollitia sequi nobis, cumque tempora explicabo labore. Autem porro
            ut minus voluptate omnis quae aspernatur quaerat vitae dolores illo
            quisquam odit animi, ullam optio, deleniti eligendi quidem, deserunt
            veniam dicta molestiae adipisci aliquid quasi. Error assumenda
            reiciendis, voluptas commodi earum eius officia id distinctio quidem
            fugiat asperiores deserunt animi perferendis alias hic aliquid amet,
            at possimus! Tempore voluptatum libero voluptatibus assumenda
            aspernatur dolor accusamus dolore nesciunt cupiditate eos impedit
            ipsa eveniet, et ea possimus ab vero officia quasi ipsam ipsum
            quaerat quisquam magnam maxime repellendus. Ea explicabo voluptate
            facere omnis laborum alias eveniet accusamus ipsam dolorem nisi,
            quibusdam dolorum reprehenderit esse consequatur impedit vitae
            excepturi, beatae in reiciendis. Perspiciatis quas voluptate eaque
            atque, optio iusto doloremque commodi iure soluta ratione. In omnis
            iste expedita ducimus nobis illo, temporibus cumque dicta aliquid
            sequi eveniet facilis rem cupiditate recusandae animi blanditiis
            sunt adipisci dolorem voluptatibus ea mollitia ex. Dolore expedita
            vitae vel eum! Nisi, fugit. Rem nulla sint dolor sapiente officia
            aperiam neque, praesentium laboriosam in omnis asperiores harum at,
            ipsam mollitia! Enim molestiae consequuntur consectetur sed vitae
            obcaecati eveniet debitis soluta saepe eum! Qui dolor exercitationem
            aperiam aliquid rem nam quidem cumque hic accusamus facilis
            voluptatem, quos eligendi omnis mollitia vero explicabo dicta porro
            saepe! Accusamus incidunt adipisci iure doloremque eligendi itaque
            iusto beatae officia. Officia quam nesciunt vero itaque, saepe
            dolores, veritatis quod corrupti perferendis aliquam dolorum a
            libero magni quas vitae amet provident voluptate consectetur,
            doloribus impedit numquam minus! Consequuntur inventore fugiat vitae
            commodi laborum, veniam doloremque doloribus placeat dolor quos
            alias sed, dignissimos provident ab amet rem consequatur ad aliquid
            praesentium possimus esse ratione sunt, sit obcaecati! Qui obcaecati
            eos cupiditate repudiandae quam! Corporis id dicta, necessitatibus
            ad vel explicabo hic in vero atque eligendi molestiae veniam porro
            suscipit.
          </p>
        </div>
      </section>
      <footer className="footer">
        <div className="container__footer container__flex">
          <div id="footer-links">
            <ul id="footer__linkList">
              <li className="footer__links">
                <NavLink to="/aboutus">About</NavLink>
              </li>

              <li className="footer__links">
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li className="footer__links">
                <NavLink to="/blog">Blog</NavLink>
              </li>
              <li className="footer__links">
                <NavLink to="/ourserivce">service</NavLink>
              </li>
            </ul>
          </div>
          <div id="footer-contact">
            <ul id="footer__contact">
              <li className="contact__list">contact</li>
              <li className="contact__list">+2519878378</li>
              <li className="contact__list">+2519878378</li>
              <li className="contact__list">+2519878378</li>
            </ul>
          </div>
          <div id="footer-logo">
            <div>
              <div id="footer-image-name">
                <h1 id="footer__logo__header1">
                  <i className="fa fa-stethoscope"></i>
                  <span style={{ color: "greenyellow" }}>Save</span>
                  <span style={{ color: "white" }}>lives</span>
                </h1>
              </div>
              <div id="footer-socials">
                <h2 id="footer__socials__header2">Follow Us On</h2>
                <div>
                  <ul id="footer__socials__list">
                    <li className="footer__social__links">
                      <a href="#" className="instagram">
                        <i
                          className="fa-brands fa-instagram"
                          style={{ paddingRight: "10px", fontSize: "40px" }}
                        ></i>
                        <br />
                        instagram
                      </a>
                    </li>
                    <li className="footer__social__links">
                      <a href="#" className="facebook">
                        <i
                          className="fa-brands fa-facebook"
                          style={{ paddingRight: "10px", fontSize: "40px" }}
                        ></i>
                        <br />
                        facebook
                      </a>
                    </li>
                    <li className="footer__social__links">
                      <a href="#" className="twitter">
                        <i
                          className="fa-brands fa-twitter"
                          style={{ paddingRight: "10px", fontSize: "40px" }}
                        ></i>
                        <br />
                        twitter
                      </a>
                    </li>
                    <li className="footer__social__links">
                      <a href="#" className="linkedin">
                        <i
                          className="fa-brands fa-linkedin"
                          style={{ paddingRight: "10px", fontSize: "40px" }}
                        ></i>
                        <br />
                        linkedin
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="footer__text">
          <i className="bi bi-c-circle me-2"></i>All Rights reserved save lives
        </p>
      </footer>
    </>
  );
}
