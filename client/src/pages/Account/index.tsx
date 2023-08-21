import { UserIcon } from "@heroicons/react/20/solid";
import Grid from "../../components/common/Grid";
import ListBox from "./ListBox";
import { FolderIcon } from "@heroicons/react/24/outline";

const Account = () => {
  return (
    <Grid>
      <div className="mt-2 space-y-3">
        <ListBox Icon={UserIcon} title="My Account" to={"/"} />
        <ListBox Icon={FolderIcon} title="Recipe" to={"/"} />
      </div>
      <div className="px-2">
        <button className="btn btn-error btn-outline">Logout</button>
      </div>
    </Grid>
  );
};

export default Account;
