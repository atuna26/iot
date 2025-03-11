import styles from "../../style";

const NewCategoryCard = () => {


    return (
        <div className={`flex flex-col ${styles.flexCenter} w-full h-[100px] max-w-[450px] col-span-1 rounded-md p-4 shadow-md border-dashed border-2 border-[#002f4f]`}>
           <i className="fa-solid fa-plus fs-4 text-[40px] "></i>
        </div>
    );
};


export default NewCategoryCard;