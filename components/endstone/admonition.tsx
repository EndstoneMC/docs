import {FaCircleInfo} from "react-icons/fa6";
import {ReactNode} from "react";
import {cn} from "@/lib/utils";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {FaFire, FaLightbulb} from "react-icons/fa";

const typeStyles = {
  note: {
    bg: "bg-blue-500/10 dark:bg-blue-600/30",
    border: "border-blue-300 dark:border-blue-600/70",
    icon: <FaCircleInfo className="h-4 w-4 !text-blue-500"/>,
    title: "Note",
  },
  tip: {
    bg: "bg-emerald-500/10 dark:bg-emerald-600/30",
    border: "border-emerald-300 dark:border-emerald-600/70",
    icon: <FaFire className="h-4 w-4 !text-emerald-500"/>,
    title: "Tip",
  },
  important: {
    bg: "bg-amber-500/10 dark:bg-amber-600/30",
    border: "border-amber-300 dark:border-amber-600/70",
    icon: <FaCircleInfo className="h-4 w-4 !text-amber-500"/>,
    title: "Important",
  },
  warning: {
    bg: "bg-yellow-500/10 dark:bg-yellow-600/30",
    border: "border-yellow-300 dark:border-yellow-600/70",
    icon: <FaCircleInfo className="h-4 w-4 !text-yellow-500"/>,
    title: "Warning",
  },
  caution: {
    bg: "bg-destructive/10 dark:bg-destructive/20",
    border: "border-destructive/50 dark:border-destructive/70",
    icon: <FaCircleInfo className="h-4 w-4 !text-destructive"/>,
    title: "Caution",
  },
};

type AdmonitionType = "note" | "tip" | "important" | "warning" | "caution";

interface AdmonitionProps {
  type: AdmonitionType;
  children: ReactNode;
  title?: string;
}

export default function Admonition({type, children, title}: AdmonitionProps) {
  const styles = typeStyles[type];

  return (
    <Alert className={cn(
      "p-4 rounded-none border-l-4 border-r-0 border-y-0 space-x-2",
      styles.bg,
      styles.border
    )}>
      {styles.icon}
      <AlertTitle className="font-semibold pb-2">
        {title ?? styles.title}
      </AlertTitle>
      <AlertDescription className="text-foreground">
        {children}
      </AlertDescription>
    </Alert>
  );
}