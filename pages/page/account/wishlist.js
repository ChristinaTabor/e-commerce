import React from 'react';
import CommonLayout from '../../../components/shop/common-layout';
import WishlistPage from './common/wishlist-page';


const Wishlist = () => {
    return (
        <CommonLayout parent="home" title="wishlist">
            <WishlistPage />
        </CommonLayout>
    )
}

export default Wishlist;