import { useEffect, useRef, useState } from "react";

export default function Searching({search, close}){
    const [searchMenu, setSearchMenu] = useState(false);
    const toggleSearchMenu = () => {
        setSearchMenu(!searchMenu);
    };
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchQuery.trim() !== '') {
            const encodedQuery = encodeURIComponent(searchQuery).replace(/%20/g, '-').replace(/%2B/g, '-').toLowerCase();
            window.location.href = `/search/${encodedQuery}`;
        }
    };
    useEffect(() => {
        if (searchMenu) {
          const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
              setSearchMenu(false);
            }
          };
          searchInputRef.current.focus();
          window.addEventListener('keydown', handleKeyDown);
          return () => window.removeEventListener('keydown', handleKeyDown);
        }
      }, [searchMenu]);
    return(
        <>
        <button onClick={toggleSearchMenu}>
           <img className="w-[24px] sm:mx-5 mx-3" src={search} alt="" />
        </button>
        {searchMenu && (
            <div className="fixed inset-0 bg-white flex justify-center items-center">
                <form className=" mb-16  font-bold" onSubmit={handleSubmit}>
                    <button>
                       <img className="w-8 top-5 md:right-[76px] right-[10vw] absolute" src={close} alt="" onClick={toggleSearchMenu}/>
                    </button>
                    <input
                        type="search"
                        className="p-2 md:text-5xl text-3xl text-center bg-transparent border-b-[6px] border-black  outline-none md:w-[50vw] w-[70vw]"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        ref={searchInputRef}
                    />
                    <p className="text-end pt-4">PRESS ENTER TO SEARCH  <br/> OR ESC TO CLOSE</p>
                </form>
                
            </div>
        )}
        </>
    )
    
}