export default function Sort({ selectedSort, handleSortChange}){
    return(
        <div>
        <label htmlFor="sort-select">SORT BY:</label>
        <select className="text-black" id="sort-select" value={selectedSort} onChange={handleSortChange}>
          <option value="recommended">Recommended</option>
          <option value="price">Price (low to high)</option>
          <option value="-price">Price (high to low)</option>
          <option value="name">Name</option>
        </select>
        </div>
    )
}