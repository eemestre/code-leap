import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Spinner } from "./ui/spinner";
import { Form, useNavigate } from "react-router";

function SignUpCard() {
  const [username, setUsername] = useState<string>("");
  const [spin, setSpin] = useState(false);
  const navigate = useNavigate();

  const inputChange = (e: any) => {
    e.target.removeAttribute("aria-invalid");
    setUsername(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (username.replace(/\s/g, "") !== username || username === "") {
      const usernameInput = window.document.getElementById("username");
      usernameInput?.setAttribute("aria-invalid", "true");
      return;
    }
    setSpin(true);
    localStorage.setItem("loggedUser", username);
    navigate(`/feed/${username}`);
  };

  useEffect(() => {
    if (localStorage.getItem("loggedUser")) {
      navigate(`/feed/${localStorage.getItem("loggedUser")}`);
    }
  }, []);

  return (
    <Card className="w-full max-w-sm relative">
      <CardHeader>
        <CardTitle className="flex items-start">
          <h1 className="font-bold text-lg">Welcome to CodeLeap network!</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Please enter your username</Label>
              <Input
                id="username"
                name="username"
                placeholder="John doe"
                value={username}
                onChange={(e) => inputChange(e)}
              />
            </div>
            <Button
              type="submit"
              className={`bg-blue-codeleap text-white px-5 font-bold max-w-fit place-self-end gap-2 ${username.replace(/\s/g, "") !== username || username === "" || spin ? "cursor-not-allowed opacity-35" : "hover:opacity-80"}`}
              onClick={(e) => handleSubmit(e)}
            >
              ENTER
              <Spinner className={spin ? "" : "hidden"} />
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}

export default SignUpCard;
