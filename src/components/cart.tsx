import { useDroppable } from "@dnd-kit/core";

interface CartProps {
  title: string;
  children: JSX.Element | JSX.Element[];
}

const Cart: React.FC<CartProps> = ({ title, children }: CartProps) => {
  const { setNodeRef } = useDroppable({
    id: title,
  });
  return (
    <div
      ref={setNodeRef}
      id={title}
      className="flex-auto border border-dipricate rounded-md text-right p-3"
    >
      <div>
        <h1 className="lg:text-xl text-center text-lg">{title}</h1>
        <br className="w-11/12 text-white h-px" />
        {children}
      </div>
    </div>
  );
};

export default Cart;
