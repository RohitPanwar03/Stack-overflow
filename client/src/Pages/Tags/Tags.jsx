import React from 'react'
import LeftSidebar from './../../components/LeftSidebar/LeftSidebar';
import TagList from './TagList';
import './tags.css'

const Tags = () => {

    const tagsList = [{
        id: 1,
        tagName: "javascript",
        tagDesc: "A aigoiaebg ieangin OUV ioegbva v io gioba ev ioa voua v oiavo a vobivo o"
    }, {
        id: 2,
        tagName: "python",
        tagDesc: "A aigoiaebg ieangin OUV ioegbva v io gioba ev ioa voua v oiavo a vobivo o"
    }, {
        id: 3,
        tagName: "css",
        tagDesc: "A aigoiaebg ieangin OUV ioegbva v io gioba ev ioa voua v oiavo a vobivo o"
    }, {
        id: 4,
        tagName: "java",
        tagDesc: "A aigoiaebg ieangin OUV ioegbva v io gioba ev ioa voua v oiavo a vobivo o"
    }, {
        id: 5,
        tagName: "Rust",
        tagDesc: "A aigoiaebg ieangin OUV ioegbva v io gioba ev ioa voua v oiavo a vobivo o"
    }]

    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className="home-container-2">
                <h1 className='tags-h1'>Tags</h1>
                <p className='tags-p'>A tag is a keyword or a label that categorizes your question with other,similar questions.</p>
                <p className='tags-p'>Using the right tags makes it easier for others to find and answer your question.</p>
                <div className="tags-list-container">
                    {tagsList.map((tag) => (
                        <TagList tag={tag} key={tagsList.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Tags
