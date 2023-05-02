import classes from "./Menu.modules.css";
import Menuitem from "./Menuitem/Menuitem";
const MENU_ITEMS = [
  {
    id: "m1",
    name: "Chicken Burger",
    description: "The Classic Chicken Fillet Burger",
    prices: 5.99,
  },
  {
    id: "m2",
    name: "Cheese Burger",
    description: "classic cheeseburger with a beef patty and melted cheese.",
    prices: 6.99,
  },
  {
    id: "m3",
    name: "Supreme Burger",
    description:
      "Juicy Chicken burger topped with special sauce, hashbrown and cheese",
    prices: 8.99,
  },
  {
    id: "m4",
    name: "Vege Burger ",
    description: "Healthy...and green...",
    prices: 7.99,
  },
];

const Menu = () => {
  const menuList = MENU_ITEMS.map((meal) => (
    <Menuitem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.prices}
    />
  ));
  return (
    <section className={classes.meals}>
      <ul>{menuList}</ul>
    </section>
  );
};
export default Menu;
