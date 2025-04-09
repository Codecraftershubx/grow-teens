import React, { useMemo } from "react";
import {
  Flex,
  Button,
  IconButton,
  Text,
  Box,
  useColorModeValue,
  useBreakpointValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage?: number;
  showingItems?: number;
  onPageChange: (page: number) => void;
  colorScheme?: string;
  showArrows?: boolean;
  showFirstLast?: boolean;
  maxDisplayedPages?: number;
  showItemCount?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  showingItems,
  onPageChange,
  colorScheme = "primary",
  showArrows = true,
  showFirstLast = false,
  maxDisplayedPages = 5,
  showItemCount = true,
  size = "sm",
  isLoading = false,
}) => {
  const mutedTextColor = useColorModeValue("gray.500", "gray.400");
  const showCountText = useBreakpointValue({ base: false, md: showItemCount });
  
  // Calculate the visible page numbers
  const visiblePageNumbers = useMemo(() => {
    if (totalPages <= maxDisplayedPages) {
      // If we have fewer pages than the max to display, show all
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Calculate start and end page numbers to display
    let startPage = Math.max(currentPage - Math.floor(maxDisplayedPages / 2), 1);
    let endPage = startPage + maxDisplayedPages - 1;
    
    // Adjust if we're near the end
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxDisplayedPages + 1, 1);
    }
    
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }, [currentPage, totalPages, maxDisplayedPages]);

  // Handle going to a specific page
  const handleGoToPage = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages && !isLoading) {
      onPageChange(page);
    }
  };

  // Calculate item counts for display
  const itemCountText = useMemo(() => {
    if (!showCountText || !totalItems) return null;
    
    const startItem = Math.min((currentPage - 1) * (itemsPerPage || 10) + 1, totalItems);
    const endItem = Math.min(startItem + (showingItems || itemsPerPage || 10) - 1, totalItems);
    
    return `Showing ${startItem}-${endItem} of ${totalItems} items`;
  }, [currentPage, totalItems, itemsPerPage, showingItems, showCountText]);

  return (
    <Flex 
      justify="space-between" 
      align="center" 
      mt={6} 
      w="100%"
      flexDir={{ base: showCountText ? "column" : "row", md: "row" }}
      gap={{ base: 3, md: 0 }}
    >
      {showCountText && itemCountText && (
        <Text color={mutedTextColor} fontSize={size}>
          {itemCountText}
        </Text>
      )}
      
      <Box ml={{ base: 0, md: showCountText ? "auto" : 0 }}>
        <Flex align="center" justify="center">
          {showFirstLast && (
            <IconButton
              aria-label="Go to first page"
              icon={<FiChevronsLeft />}
              size={size}
              variant="ghost"
              mr={1}
              isDisabled={currentPage === 1 || isLoading}
              onClick={() => handleGoToPage(1)}
            />
          )}
          
          {showArrows && (
            <IconButton
              aria-label="Previous page"
              icon={<FiChevronLeft />}
              size={size}
              mr={2}
              isDisabled={currentPage === 1 || isLoading}
              onClick={() => handleGoToPage(currentPage - 1)}
            />
          )}
          
          {/* First page (if not in visible range) */}
          {visiblePageNumbers[0] > 1 && (
            <>
              <Button
                size={size}
                variant="outline"
                colorScheme="gray"
                mx={1}
                onClick={() => handleGoToPage(1)}
                isDisabled={isLoading}
              >
                1
              </Button>
              {visiblePageNumbers[0] > 2 && (
                <Text mx={1} color={mutedTextColor}>
                  ...
                </Text>
              )}
            </>
          )}
          
          {/* Visible page numbers */}
          {visiblePageNumbers.map((pageNum) => (
            <Button
              key={pageNum}
              size={size}
              variant={currentPage === pageNum ? "solid" : "outline"}
              colorScheme={currentPage === pageNum ? colorScheme : "gray"}
              mx={1}
              onClick={() => handleGoToPage(pageNum)}
              isDisabled={isLoading}
              aria-current={currentPage === pageNum ? "page" : undefined}
            >
              {pageNum}
              {currentPage === pageNum && (
                <VisuallyHidden>(current)</VisuallyHidden>
              )}
            </Button>
          ))}
          
          {/* Last page (if not in visible range) */}
          {visiblePageNumbers[visiblePageNumbers.length - 1] < totalPages && (
            <>
              {visiblePageNumbers[visiblePageNumbers.length - 1] < totalPages - 1 && (
                <Text mx={1} color={mutedTextColor}>
                  ...
                </Text>
              )}
              <Button
                size={size}
                variant="outline"
                colorScheme="gray"
                mx={1}
                onClick={() => handleGoToPage(totalPages)}
                isDisabled={isLoading}
              >
                {totalPages}
              </Button>
            </>
          )}
          
          {showArrows && (
            <IconButton
              aria-label="Next page"
              icon={<FiChevronRight />}
              size={size}
              ml={2}
              isDisabled={currentPage === totalPages || isLoading}
              onClick={() => handleGoToPage(currentPage + 1)}
            />
          )}
          
          {showFirstLast && (
            <IconButton
              aria-label="Go to last page"
              icon={<FiChevronsRight />}
              size={size}
              variant="ghost"
              ml={1}
              isDisabled={currentPage === totalPages || isLoading}
              onClick={() => handleGoToPage(totalPages)}
            />
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Pagination;