import React, {Component} from 'react';
import {Route, withRouter, Link} from 'react-router-dom';

class UserFooter extends Component {
    render() {
        return (
<div>
<footer>
<div id="footer">
<div className="container">
<div className="row row-bottom-padded-md">
<div className="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
<h3>About Travel</h3>
<p>Far far away, behind the word mountains, far from the countries Vokalia and
Consonantia, there live the blind texts.</p>
</div>
<div className="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
<h3>Top Flights Routes</h3>
<ul>
<li><a href="#">Manila flights</a></li>
<li><a href="#">Dubai flights</a></li>
<li><a href="#">Bangkok flights</a></li>
<li><a href="#">Tokyo Flight</a></li>
<li><a href="#">New York Flights</a></li>
</ul>
</div>
<div className="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
<h3>Top Hotels</h3>
<ul>
<li><a href="#">Boracay Hotel</a></li>
<li><a href="#">Dubai Hotel</a></li>
<li><a href="#">Singapore Hotel</a></li>
<li><a href="#">Manila Hotel</a></li>
</ul>
</div>
<div className="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
<h3>Interest</h3>
<ul>
<li><a href="#">Beaches</a></li>
<li><a href="#">Family Travel</a></li>
<li><a href="#">Budget Travel</a></li>
<li><a href="#">Food &amp; Drink</a></li>
<li><a href="#">Honeymoon and Romance</a></li>
</ul>
</div>
<div className="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
<h3>Best Places</h3>
<ul>
<li><a href="#">Boracay Beach</a></li>
<li><a href="#">Dubai</a></li>
<li><a href="#">Singapore</a></li>
<li><a href="#">Hongkong</a></li>
</ul>
</div>
<div className="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
<h3>Affordable</h3>
<ul>
<li><a href="#">Food &amp; Drink</a></li>
<li><a href="#">Fare Flights</a></li>
</ul>
</div>
</div>
<div className="row">
<div className="col-md-6 col-md-offset-3 text-center">
<p className="fh5co-social-icons">
<a href="#"><i className="icon-twitter2"/></a>
<a href="#"><i className="icon-facebook2"/></a>
<a href="#"><i className="icon-instagram"/></a>
<a href="#"><i className="icon-dribbble2"/></a>
<a href="#"><i className="icon-youtube"/></a>
</p>
<p>Copyright 2017. All Rights Reserved. <br/>Made with <i
className="icon-heart3"/></p>
</div>
</div>
</div>
</div>
</footer>

</div>
        );
}
}
export default withRouter(UserFooter);