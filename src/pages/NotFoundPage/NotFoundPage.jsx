import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <h1>This page doesn&apos;t exist</h1>
      <Link to="/">Go to home</Link>
    </>
  );
};

export default NotFoundPage;
