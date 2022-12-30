import React, {useState} from 'react';
import Header from "../../components/header/Header";
// Verzend mail met nodemailer
// https://www.npmjs.com/package/nodemailer-react
// https://developers.google.com/recaptcha/docs/display
const ContactPage = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [remark, setRemark] = useState('');


    function handleSubmit(e) {
        e.preventDefault();
        console.log(`
    Firstname: ${firstname}, 
    Lastname: ${lastname}, 
    Email: ${email}, 
    Remark: ${remark}, 
    `);
        console.log(`Firstname: ${firstname}, Lastname: ${lastname}, Email: ${email}, Remark: ${remark}`);
    }

    return (
        <>
            <Header>
                <h1>Recipes.com contactpage</h1>
            </Header>
            <section className="outer-container">
                <div className="inner-container">
                    <form onSubmit={handleSubmit}>
                        <section>
                            <label htmlFor="firstname-field">First Name</label>
                            <input
                                name="firstname"
                                id="firstname-field"
                                type="text"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </section>
                        <section>
                            <label htmlFor="lastname-field">Last Name</label>
                            <input
                                name="lastname"
                                id="lastname-field"
                                type="text"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </section>
                        <section>
                            <label htmlFor="email-field">Email</label>
                            <input
                                name="email"
                                id="email-field"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </section>
                        <section>
                            <label htmlFor="remark-field">Remark</label>
                            <textarea
                                name="remark"
                                id="remark-field"
                                value={remark}
                                onChange={(e) => setRemark(e.target.value)}
                                rows={6}
                                cols={40}
                            />
                        </section>
                        <button type="submit">Send</button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default ContactPage;