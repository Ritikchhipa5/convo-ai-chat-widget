import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";

type Props = {
  deleting: boolean;
  onDeleteDomain: () => void;
};

export default function DomainButtonHandler({
  onDeleteDomain,
  deleting,
}: Props) {
  return (
    <div className="flex justify-end gap-4">
      <Button
        size="lg"
        type="button"
        variant="destructive"
        onClick={onDeleteDomain}
      >
        <Loader loading={deleting}>Delete Domain</Loader>
      </Button>
      {/* <Button size="lg" type="submit">
        <Loader loading={loading}>Save</Loader>
      </Button> */}
    </div>
  );
}
