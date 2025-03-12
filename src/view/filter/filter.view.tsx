import { useRef } from "react";

interface FilterProps {
    onFilterChange: (filterText: string) => void;
    filteredCount: number;
}
export function Filter({ onFilterChange, filteredCount }: FilterProps) {
    const myInput = useRef<HTMLInputElement>(null);
      
      const handleInputChange = () => {
        if(!myInput.current) return
        onFilterChange(myInput.current.value);
      };

    return(
        <div className="header">
        <h4 className="filter_title">{filteredCount} items filtered</h4>
        <input 
        className="filter"
        ref={myInput}
        type="text"
        onChange={handleInputChange}
        />
     </div>
    );
}