import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';
import Card from '../UI/Card';

const features = [
  {
    icon: '🚚',
    title: 'Fast Delivery',
    description: 'Get your orders delivered quickly',
  },
  {
    icon: '💳',
    title: 'Secure Payment',
    description: 'Shop with confidence and security',
  },
  {
    icon: '🎁',
    title: 'Best Prices',
    description: 'Amazing deals and discounts',
  },
];


const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto">
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Welcome to <span className="text-primary">Bondok Shop</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover amazing products at unbeatable prices. 
            Your one-stop shop for everything you need!
          </p>
          
          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center">
            <Button
              as={Link}
              to="/products"
              size="xl"
              className="bg-blue-700 hover:bg-blue-800 shadow-lg"
            >
              Shop Now
            </Button>
           
           
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center border-0" shadow="md">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;