const getData = (products, property) => {
    let data = new Set();
    products.forEach(product => {
        const y = product[property];
        if (y) {
            Array.isArray(y) ? y.forEach(item => data.add(item)) : data.add(y);
        }
    });
    return [...data];
}

export default function Filter({ products }){
    const categories = getData(products, "categories");
    const colors = getData(products, "colors");
    const sizes = getData(products, "sizes");
    return(
        <>
        <button>FILTER</button>
        <div>
        {categories && <h1>CATEGORIES</h1>}
        {categories && categories.map(category => (
            <h1 key={category}>{category}</h1>
        ))}
            
        </div>
        <div>{colors && 'COLORS'}</div>
        <div>{sizes && 'SIZES'}</div>
        </>
    
    )
}