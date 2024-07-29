import { signInWithEmailAndPassword } from "firebase/auth";
import withSession from "./session";
import { auth } from "../../../firebase.config";

export default withSession(async function handler(req, res) {
  if (req.method == "POST") {
    const { email, password } = req.body;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        phoneNumber: userCredential.user.phoneNumber
      };

      //store the user data in session
      req.session.set("user", user);
      await req.session.save();

      res.status(200).json({ user: userCredential.user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(404).end();
  }
});
