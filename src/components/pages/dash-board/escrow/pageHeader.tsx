import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PageHeader = ({ title }: { title: string }) => {
  return (
    <div className="bg-white px-4 py-2 md:px-10 md:py-7 flex w-full h-[80px] items-center justify-between">
      {/*Page Title */}
      <span>
        <h1 className="w-fit text-nowrap">{title}</h1>
      </span>

      <div className="w-[78%] flex items-center justify-between h-[48px]">
        {/* Search Input */}
        <div className="w-1/2">
          <Input 
            type="text"
            placeholder="Search Users, Transactions..."
            className="bg-[#F8F9FA] border-none shadow-none"
          />
        </div>

        {/* Regularize Button */}
        <div className="w-fit">
          <Button className="bg-white w-[96px] h-[40px] hover:bg-white shadow-none text-primary border-1 rounded-sm border-primary cursor-pointer">
            Regularize
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
