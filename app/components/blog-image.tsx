import Image, { ImageProps } from "next/image";

export function BlogImage(props: ImageProps) {
  return (
    <div className="flex justify-center">
      <Image {...props} />
    </div>
  );
}

export function BlogVideo(props: React.VideoHTMLAttributes<HTMLVideoElement>) {
  return (
    <div className="flex justify-center">
      <video {...props} className="" controls />
    </div>
  );
}
