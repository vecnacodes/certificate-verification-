import { Input } from "@/components/ui/input";

const Form = () => {
  return (
    <div>
      <label htmlFor="username">Username</label>
      <Input id="username" placeholder="Enter your username" className="mt-2" />

      <label htmlFor="password">Password</label>
      <Input id="password" type="password" placeholder="Enter your password" className="mt-2" />
    </div>
  );
};

export default Form;
