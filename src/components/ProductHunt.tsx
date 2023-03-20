import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const ProductHunt = () => {
  return (
    <div className="flex justify-end px-8 mb-2">
      <Link
        href="https://www.producthunt.com/products/reac-doc-gpt/reviews?utm_source=badge-product_review&utm_medium=badge&utm_souce=badge-reac&#0045;doc&#0045;gpt"
        target="_blank"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="250"
          height="54"
          viewBox="0 0 250 54"
          version="1.1"
        >
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(-130.000000, -73.000000)">
              <g transform="translate(130.000000, 73.000000)">
                <rect
                  stroke="#FF6154"
                  stroke-width="1"
                  fill="#FFFFFF"
                  x="0.5"
                  y="0.5"
                  width="249"
                  height="53"
                  rx="10"
                />
                <text
                  font-family="Helvetica-Bold, Helvetica"
                  font-size="9"
                  font-weight="bold"
                  fill="#FF6154"
                >
                  <tspan x="53" y="20">
                    LEAVE A REVIEW ON
                  </tspan>
                </text>
                <text
                  font-family="Helvetica-Bold, Helvetica"
                  font-size="16"
                  font-weight="bold"
                  fill="#FF6154"
                >
                  <tspan x="52" y="40">
                    Product Hunt
                  </tspan>
                </text>
                <g
                  transform="translate(205.000000, 11.000000) scale(1.4)"
                  fill="#FF6154"
                >
                  <g transform="translate(3, 00)">
                    <path d="M23.04,9.021L14.77,8.796L12,1L9.23,8.796L0.96,9.021l6.559,5.043L5.177,22L12,17.321L18.823,22l-2.342-7.935L23.04,9.021z M12,14.896l-3.312,2.271l1.137-3.851l-3.183-2.448l4.014-0.109L12,6.974l1.344,3.784l4.014,0.109l-3.183,2.448l1.137,3.851 L12,14.896z" />
                  </g>
                </g>

                <g transform="translate(11.000000, 12.000000)">
                  <path
                    d="M31,15.5 C31,24.0603917 24.0603917,31 15.5,31 C6.93960833,31 0,24.0603917 0,15.5 C0,6.93960833 6.93960833,0 15.5,0 C24.0603917,0 31,6.93960833 31,15.5"
                    fill="#FF6154"
                  />
                  <path
                    d="M17.4329412,15.9558824 L17.4329412,15.9560115 L13.0929412,15.9560115 L13.0929412,11.3060115 L17.4329412,11.3060115 L17.4329412,11.3058824 C18.7018806,11.3058824 19.7305882,12.3468365 19.7305882,13.6308824 C19.7305882,14.9149282 18.7018806,15.9558824 17.4329412,15.9558824 M17.4329412,8.20588235 L17.4329412,8.20601152 L10.0294118,8.20588235 L10.0294118,23.7058824 L13.0929412,23.7058824 L13.0929412,19.0560115 L17.4329412,19.0560115 L17.4329412,19.0558824 C20.3938424,19.0558824 22.7941176,16.6270324 22.7941176,13.6308824 C22.7941176,10.6347324 20.3938424,8.20588235 17.4329412,8.20588235"
                    fill="#FFFFFF"
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </Link>
    </div>
  );
};

export default ProductHunt;
