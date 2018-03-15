import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Carousel, CarouselItem, CarouselIndicators, CarouselCaption } from 'reactstrap';
import grandparents from '../images/grandparents.png'; // Tell Webpack this JS file uses this image
import partners from '../images/shopping.png'; // Tell Webpack this JS file uses this image
import micro from '../images/piggybank.png'; // Tell Webpack this JS file uses this image

var items = [
  {
    src: micro,
    altText: 'Invest a $1 here, round up a $1 there and see the $$ add up',
    captionTitle: "Small Amounts, Big Impact",
    captionSubtitle: 'Invest a $1 here, round up a $1 there and watch the magic of compounding do its work.'
  },
  {
    src: grandparents,
    altText: 'Friends + Family',
    captionTitle: "Your Friends + Family",
    captionSubtitle: "What's better than stocking stuffers? Pax gifts that grow tax-free - one click gifting made easy!"
  },
  {
    src: partners,
    altText: 'Partnerships',
    captionTitle: "Partner Up",
    captionSubtitle: 'We partner with credit card companies, brands, employers to grow your savings even faster'
  }
];

class ContributionOptions extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
	    return (
	      <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src} src={item.src} altText={item.altText}>
        	<CarouselCaption captionText={item.captionSubtitle} captionHeader={item.captionTitle} />
	      </CarouselItem>
	    )});

    var colorClass = "m-auto h-100";

    switch (activeIndex) {
    	case 0:
    		colorClass = "m-auto h-100 contribution-0";
    		break;
    	case 1:
    		colorClass = "m-auto h-100 contribution-1";
    		break;
  		case 2:
    		colorClass = "m-auto h-100 contribution-2";
    		break;
    	default:
    		break;
    }
  	
  	return(
  		<div className="Home-section d-flex d-md-block">
  		<Row className="align-items-center h-100 align-self-center">
				<Col xs={12} sm={5} className="ml-auto">
					<Card>
						<CardBody>
      				<CardTitle>Every Dollar Counts</CardTitle>
      				<CardSubtitle>It takes a village to raise a child, Pax helps bring them together!</CardSubtitle>
      			</CardBody>
    			</Card>
    		</Col>
				<Col xs={12} sm={6} className={colorClass}>
		      <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
		        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
		        {slides}
		      </Carousel>
				</Col>
      </Row>
      </div>
  	)
  }
}

export default ContributionOptions;