import logo from "@/assets/landing/logo-white.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface InfoDialogProps {
  children?: React.ReactNode;
  className?: string;
  openButton?: React.ReactNode;
}

const KickoffDialog: React.FC<InfoDialogProps> = ({ children, openButton, className }) => {
  return (
    <Dialog>
      <DialogTrigger className="">
        <span className="rounded border-2 border-gray-700 p-1 px-2 transition duration-300 hover:border-gray-400">
          KICKOFF
        </span>
      </DialogTrigger>
      <DialogContent className="dark">
        <DialogHeader>
          <DialogDescription className="flex flex-col items-center justify-center items-center text-center pt-2">
            {/* google drive video iframe */}
            <iframe
              src="https://drive.google.com/file/d/1yySMY0nkYXhKLaNrj6XVjvr0MU9ODGtc/preview"
              height="600"
              allow="autoplay"
            ></iframe>
          </DialogDescription>

          <Separator className="my-4" />
          <DialogTitle className="pt-4">
            <a
              className="hover:underline transition-all duration-300 text-3xl"
              href="https://docs.google.com/document/d/1s0fYjCDy3-YsTDA0zD92GedPTwEaFGHd-8TT2hk183w/edit?usp=sharing"
              target="_blank"
            >
              SCRIPT
            </a>
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default KickoffDialog;
