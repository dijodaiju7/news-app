import styles from '../../styles/Feed.module.css';
import { useRouter } from 'next/router';
import { LeftCircleFilled } from '@ant-design/icons';
import { RightCircleFilled } from '@ant-design/icons';
import { NotificationOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';
import { Badge } from 'antd';

export const Feed = ({ articles, pageNumber }) => {
    const router = useRouter();
    return (
        
        <>
            
            <div className={styles.main}>
                
            <Badge dot>
      <NotificationOutlined style={{ fontSize: 38 }} />
    </Badge>
    <Badge dot>
      <a href=""><h1><u>TOP NEWS</u></h1></a>
    </Badge>                {articles.map((article, index) => (
                    <div key={index} className={styles.post}>
                        <h1 onClick={() => (window.location.href = article.url)}>{article.title}</h1>
                        <p>{article.description}</p>
                        {!!article.urlToImage && <img src={article.urlToImage} />}
                    </div>
                ))}
            </div>
            <div className={styles.paginator}>
                <div
                    className={pageNumber === 1 ? styles.disabled : styles.active}
                    onClick={() => {
                        if (pageNumber > 1) {
                            router.push(`/feed/${pageNumber - 1}`)
                        }
                    }}
                >
<LeftCircleFilled />                </div>
                <div>{pageNumber}</div>
                <div
                    className={pageNumber === 6 ? styles.disabled : styles.active}
                    onClick={() => {
                        if (pageNumber < 6) {
                            router.push(`/feed/${pageNumber + 1}`)
                        }
                    }}
                >
                    <RightCircleFilled />
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = async pageContext => {
    const pageNumber = pageContext.query.id;

    if (!pageNumber || pageNumber < 1 || pageNumber > 6) {
        return {
            props: {
                articles: [],
                pageNumber: 1,
            },
        };
    }

    const apiResponse = await fetch(
        `https://newsapi.org/v2/top-headlines?country=in&pageSize=7&page=${pageNumber}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
            },
        },
    );
    
    const json = await apiResponse.json();
    const { articles } = json;

    return {
        props: {
            articles,
            pageNumber: Number.parseInt(pageNumber),
        },
    };
};

export default Feed;