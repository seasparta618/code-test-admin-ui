import React, { useState } from 'react';
import './pagination.scss';
import '../button/button.scss';
import { ChevronLeftIcon, ChevronRightIcon, DoublChevronRightIcon, DoubleChevronLeftIcon } from '../../shared/icon';

interface PaginationProps {
    initialSelectedPage: number;
    pageRange: number[];
    buttonStyle: string;
}

type specialButtonType = 'previous' | 'next' | 'last' | 'first'

export const BuildPagination = ({ initialSelectedPage = 1, pageRange = [1, 2, 3, 4, 5], buttonStyle = 'primary' }: PaginationProps) => {
    const validatedInitialPage = pageRange.includes(initialSelectedPage) ? initialSelectedPage : Math.ceil(pageRange[pageRange.length - 1] / 2);

    const [currentPage, setCurrentPage] = useState<number>(validatedInitialPage);

    const onSpecialButtonClick = (buttonType: specialButtonType) => {
        switch (buttonType) {
            case 'previous':
                return currentPage === 1 ? null : setCurrentPage(currentPage - 1);
            case 'next':
                return currentPage === pageRange[pageRange.length - 1] ? null : setCurrentPage(currentPage + 1);
            case 'first':
                return currentPage === 1 ? null : setCurrentPage(1);
            case 'last':
                return currentPage === pageRange[pageRange.length - 1] ? null : setCurrentPage(pageRange[pageRange.length - 1]);
        }
    }

    const checkButtonDisabled = (buttonType: specialButtonType): boolean => {
        switch (buttonType) {
            case 'previous':
            case 'first':
                return currentPage === 1;
            case 'next':
            case 'last':
                return currentPage === pageRange[pageRange.length - 1];
            default:
                return false;
        }
    }

    return (<div className='pagination'>
        <div className={`iconButton-md ${checkButtonDisabled('first') ? '  button-disabled' : `${buttonStyle.length ? ` button-${buttonStyle} button-ghost` : ''}`}`} onClick={() => {
            onSpecialButtonClick('first')
        }}><DoubleChevronLeftIcon /></div>
        <div className={`iconButton-md ${checkButtonDisabled('previous') ? '  button-disabled' : `${buttonStyle.length ? ` button-${buttonStyle} button-ghost` : ''}`}`} onClick={() => {
            onSpecialButtonClick('previous')
        }}><ChevronLeftIcon /></div>
        {pageRange.map((pageNumber) => {
            return (
                <div key={pageNumber}
                    className={`iconButton-md button-${buttonStyle}${pageNumber === currentPage ? ' pagination-active' : ' button-ghost'}`}
                    onClick={() => pageNumber === currentPage ? null : setCurrentPage(pageNumber)}>{pageNumber}
                </div>)
        })}
        <div className={`iconButton-md ${checkButtonDisabled('next') ? '  button-disabled' : `${buttonStyle.length ? ` button-${buttonStyle} button-ghost` : ''}`}`} onClick={() => {
            onSpecialButtonClick('next')
        }}><ChevronRightIcon /></div>
        <div className={`iconButton-md ${checkButtonDisabled('last') ? '  button-disabled' : `${buttonStyle.length ? ` button-${buttonStyle} button-ghost` : ''}`}`} onClick={() => {
            onSpecialButtonClick('last')
        }}><DoublChevronRightIcon /></div>
    </div>)
}
