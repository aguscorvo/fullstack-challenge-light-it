type Props = {
  children: React.ReactNode;
};

export function Header({ children }: Props) {
  return (
    <header className="flex gap-4 justify-end pb-8 sticky top-8">
      {children}
    </header>
  );
}
