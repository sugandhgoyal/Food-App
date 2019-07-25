import React from 'react';
import * as homeActions from '../../actions/homeActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ShopCard from '../../components/ShopCard/ShopCard';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const Wrapper = styled.div``;

const Heading = styled.h1`
  margin: 2% 0;
  text-align: center;
`;

const SearchIcon = styled.img`
  position: absolute;
  z-index: 1;
  top: 5px;
  right: 7px;
  width: 20px;
`;

const CardsWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin: 0%;
  justify-content: center;
`;

const CustomShopCard = styled(ShopCard)`
  width: 22%;
  margin: 1% 3%;
  @media screen and (max-width: 728px){
    width: 44%;
  }
`;

const DataHeading = styled.div`
  width: 100%;
  border-bottom: 1px solid #ebebeb;
  display: flex;
  justify-content: space-between;
  padding: 0.6% 6%;
  max-width:1600px;
  margin:0px auto;
  box-sizing: border-box;
`;

const SortBy = styled.select`
  margin-right:4%;
  border-radius: 4px;
  border: solid 1px #ebebeb;
  background-color: white;
`;

const SortByOptions = styled.option``;

const Input = styled.input`
  position: relative;
  padding: 8px 30px 8px 10px;
  border-radius: 4px;
  border: 1px solid #d0cbcb;
`;

const SearchContainer = styled.div`
  position: relative;
`;


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      sort: null,
      filters: [],
      sorters: [
        {
          title: "what's new",
          key: 'newest',
          selected: true,
        }, {
          title: "price: low to high",
          key: 'price-lowest',
          selected: false,
        }, {
          title: "price: high to low",
          key: 'price-highest',
          selecte: false,
        }
      ],
      toggleMobileFilter: false,
      mobileSortOpen: false,
      mobileFiltersOpen: false,
      cartItems: [],
    };
  }

  componentDidMount() {
    const {
      loadHomePageData,
    } = this.props;

    loadHomePageData();
  }

  renderProducts = (dataToDisplay) => {
    if (dataToDisplay) {
      return dataToDisplay.map((item, index) => {
        return (
          <CustomShopCard
            key={index}
            discount={item.discount}
            image={item.image}
            title={item.name}
            newPrice={item.new_price}
            price={item.price}
            categoryName={item.category}
            slug={item.slug}
            rating={item.rating}
            addToCart={this.addToCart}
            showButton={true}
          />)
      })
    }
  }

  addToCart = (product) => {
    toast(`${product.title} Added to cart!!!!`);

    if (!localStorage.getItem('productsAddedToCart')) {
      localStorage.setItem('productsAddedToCart', JSON.stringify([]));
    }

    let cartItems = JSON.parse(localStorage.getItem('productsAddedToCart'));
    debugger
    cartItems.push(product);
    localStorage.setItem('productsAddedToCart', JSON.stringify(cartItems));
    this.setState({
      cartItems
    });

  }

  handleChange = (event) => {
    const {
      searchData,
    } = this.props;

    if (event.key === 'Enter')
      searchData(event.target.value);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      foodItems: nextProps.foodItems
    })
  }

  sortData = (event) => {
    const {
      foodItems,
    } = this.props;

    if (event.target.value === "name") {
      foodItems.sort(function (a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase())
          return -1;
        return 0;
      })
    }
    else if (event.target.value === "lowtohigh") {
      foodItems.sort(function (a, b) {
        if (a.price < b.price)
          return -1;
        if (a.price > b.price)
          return 1;
        return 0;
      })
    }

    else if (event.target.value === "hightolow") {
      foodItems.sort(function (a, b) {
        if (a.price > b.price)
          return -1;
        return 0;
      })
    }

    else if (event.target.value === "rating") {
      foodItems.sort(function (a, b) {
        if (a.rating > b.rating)
          return -1;
        return 0;
      })
    }

    this.setState({
      foodItems
    })
  }

  render() {
    const {
      searchResults,
      history,
    } = this.props;


    if (!localStorage.getItem('logged_in') || localStorage.getItem('logged_in') !== 'true') {
      history.push('/login');
    }


    const {
      foodItems
    } = this.state;

    return (
      <Wrapper>
        <DataHeading>
          <SearchContainer>
            <SearchIcon src="/search-ic.png" />
            <Input type="text" onKeyPress={(event) => this.handleChange(event)} placeholder="Search products here" />
            {/* <SearchIcon src={process.env.APP_CDN_URL + "/assets/new-bottom-bars/svg/search.svg"} /> */}
          </SearchContainer>
          <SortBy onChange={(e) => { this.sortData(e) }} value={this.state.sort}>
            <SortByOptions>Sort By: </SortByOptions>
            <SortByOptions value="name">Product Name</SortByOptions>
            <SortByOptions value="lowtohigh">Price Low to High</SortByOptions>
            <SortByOptions value="hightolow">Price High to Low</SortByOptions>
            <SortByOptions value="rating">Rating</SortByOptions>
          </SortBy>
          <div id="sort-by-event" style={{ "display": "none" }} data-sort={this.state.sort}></div>
        </DataHeading>

        <Heading>Solution to all your cravings!</Heading>

        <CardsWrapper>
          {searchResults && searchResults.length > 0 ?
            this.renderProducts(searchResults) :
            this.renderProducts(foodItems)
          }
        </CardsWrapper>
      </Wrapper>
    )
  }
}

const actions = {
  ...homeActions,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
}

const mapStateToProps = (state) => {
  return {
    foodItems: state.home.food_items,
    searchResults: state.home.search_results
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
