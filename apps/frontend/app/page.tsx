import { redirect } from "next/navigation";

export default function Home() {
  const isLogged = false;

  if (isLogged) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}