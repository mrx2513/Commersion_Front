import Alert from '@components/ui/alert';
import Scrollbar from '@components/ui/scrollbar';
import SidebarMenu from '@components/ui/sidebar-menu';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import cn from 'classnames';
import CategoryMenu from '@components/ui/category-menu';

interface CategoryDropdownProps {
  className?: string;
}

const CategoryDropdownMenu: React.FC<CategoryDropdownProps> = ({
  className,
}) => {
  let {
    data,
    
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    limit: 15,
  });
 console.log("categories data:",data)
  return (
    <div className={cn('absolute z-30', className)}>
      <div className="max-h-full overflow-hidden">
        {error ? (
          <div className="2xl:pe-10">
            <Alert message={error.message} />
          </div>
        ) : loading && data?.categories?.data?.length ? (
          Array.from({ length: 15 }).map((_, idx) => (
            <CategoryListCardLoader
              key={`category-list-${idx}`}  
              uniqueKey="category-list-card-loader"
            />
          ))
        ) : (
          
          
          <CategoryMenu items={data?.categories?.data.slice(0,15)} />
        )}
      </div>
    </div>
  );
};

export default CategoryDropdownMenu;
