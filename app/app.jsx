import _ from 'lodash';

var ReactDOM = require('react-dom');
var React = require('react');



import './css/style.css';



const LISTS = [
  {numbers: '1', letters: 'я', name: 'Ярослав Елисеев', publs: '5 публ.', pageviews: '594 395', stocked: true},
  {numbers: '2', letters: 'с', name: 'Сергей Сафонов', publs: '3 публ.', pageviews: '425 225', stocked: true},
  {numbers: '3', letters: 'н', name: 'Николай Исаков', publs: '3 публ.', pageviews: '178 078', stocked: true},
  {numbers: '4', letters: 'в', name: 'Валерий Игнатьев', publs: '1 публ.', pageviews: '156 042', stocked: true},
  {numbers: '5', letters: 'л', name: 'Людмила Андреева', publs: '1 публ.', pageviews: '148 374', stocked: true},
  {numbers: '6', letters: 'а', name: 'Андрей Смирнов', publs: '4 публ.', pageviews: '105 220', stocked: true},
  {numbers: '7', letters: 'и', name: 'Иван Сергеев', publs: '2 публ.', pageviews: '96 409', stocked: true},
  {numbers: '8', letters: 'в', name: 'Валерия Комарова', publs: '0 публ.', pageviews: '52 377', stocked: true},
  {numbers: '9', letters: 'н', name: 'Никита Евдокимов', publs: '1 публ.', pageviews: '51 920', stocked: true},
  {numbers: '10', letters: 'в', name: 'Вадим Кошелев', publs: '2 публ.', pageviews: '50 954', stocked: true},
];



/*class ListCategoryRow extends React.Component {
render() {
const numbers = this.props.numbers;
return (
 <tr>
   <th colSpan="2">
     {numbers}
   </th>
 </tr>
);
}
}*/

class ListRow extends React.Component {
render() {
const list = this.props.list;
const name = list.stocked ?
 list.name :

 <span>
   {list.name}
 </span>;

return (
      <li>
        <div className="list">
          <div className="number">{list.numbers}</div>
          <div><a>{list.letters}</a></div>
          <div className="name">
            <p>{name}</p>
            <span>{list.publs}</span>
          </div>
          <div className="pageviews"><p>{list.pageviews}</p></div>
        </div>
      </li>

);
}
}

class ListTable extends React.Component {
render() {
const filterText = this.props.filterText;
const inStockOnly = this.props.inStockOnly;

const rows = [];
let lastCategory = null;

this.props.lists.forEach((list) => {
 if (list.name.indexOf(filterText) === -1) {
   return;
 }
 if (inStockOnly && !list.stocked) {
   return;
 }
 /*if (list.numbers !== lastCategory) {
   rows.push(
     <ListCategoryRow
       numbers={list.numbers}
       key={list.numbers} />
   );
 }*/
 rows.push(
   <ListRow
     list={list}
     key={list.name}
   />
 );
 lastCategory = list.numbers;
});

return (
 <div className="main">
     <ul className="num">
      {rows}
     </ul>
 </div>
);
}
}

class SearchBar extends React.Component {
constructor(props) {
super(props);
this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
this.handleInStockChange = this.handleInStockChange.bind(this);
}

handleFilterTextChange(e) {
this.props.onFilterTextChange(e.target.value);
}

handleInStockChange(e) {
this.props.onInStockChange(e.target.checked);
}

render() {
return (
 <form>
   <input
     type="text"
     placeholder="Поиск авторов по имени"
     value={this.props.filterText}
     onChange={this.handleFilterTextChange}
   />
 </form>
);
}
}

class FilterableListTable extends React.Component {
constructor(props) {
super(props);
this.state = {
 filterText: '',
 inStockOnly: false
};

this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
this.handleInStockChange = this.handleInStockChange.bind(this);
}

handleFilterTextChange(filterText) {
this.setState({
 filterText: filterText
});
}

handleInStockChange(inStockOnly) {
this.setState({
 inStockOnly: inStockOnly
})
}

render() {
return (
 <div>
   <SearchBar
     filterText={this.state.filterText}
     inStockOnly={this.state.inStockOnly}
     onFilterTextChange={this.handleFilterTextChange}
     onInStockChange={this.handleInStockChange}
   />
   <ListTable
     lists={this.props.lists}
     filterText={this.state.filterText}
     inStockOnly={this.state.inStockOnly}
   />
 </div>
);
}
}




ReactDOM.render(
<FilterableListTable lists={LISTS} />,
document.getElementById('container')
);
