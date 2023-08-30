import Grid from "../../components/common/Grid";
import Banner from "./Banner";
import Populer from "./Populer";
import { useAuthUser } from "react-auth-kit";
export default function Home() {
  const auth = useAuthUser();
  return (
    <Grid>
      {auth()?.user}
      sdfknsdln
      <Banner />
      <Populer />
    </Grid>
  );
}
