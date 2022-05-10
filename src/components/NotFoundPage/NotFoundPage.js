import { Link } from "react-router-dom";
import classes from "./NotFoundPage.module.css"

const NotFoundPage = () => {
  return(
    <div className={classes.NotFoundPage}>
      <h1>Sorry, but page is not exist</h1>
      <Link>Go home</Link>
    </div>
  )
}

export default NotFoundPage