interface ErrorCardProps {
    title?: string;
    message: string;
  }
  export default function ErrorCard({
    title = 'Unable to load data',
    message,
  }: ErrorCardProps) {
    return (
      <div className="panel border-live/40 bg-live/10 p-5">
        <h3 className="text-sm font-bold uppercase tracking-widest 
  text-live">{title}</h3>
        <p className="mt-2 text-sm text-text-primary">{message}</p>
      </div>
    );
  }