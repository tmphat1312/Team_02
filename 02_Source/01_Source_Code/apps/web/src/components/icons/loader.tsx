import { cn } from "@/lib/utils";

export function Loader({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 50 50"
      className={cn("text-gray-300 size-20", className)}
      {...props}
    >
      <g>
        <circle cx={15} cy={25} r={3} fill="currentColor">
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="1.5s"
            begin="0s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
      <g>
        <circle cx={25} cy={25} r={3} fill="currentColor">
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="1.5s"
            begin="0.3s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
      <g>
        <circle cx={35} cy={25} r={3} fill="currentColor">
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="1.5s"
            begin="0.6s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
}
